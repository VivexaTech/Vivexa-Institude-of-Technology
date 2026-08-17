"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, PlayCircle, Video } from "lucide-react";
import { usePortalAuth } from "@/context/PortalAuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { EmptyState } from "@/components/portal/EmptyState";

type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
};

export default function RecordingsPage() {
  const { studentData } = usePortalAuth();
  const { batches, dataLoading } = usePortalData();

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] =
    useState<YouTubeVideo | null>(null);

  /*
   * Student document me:
   *
   * studentData.batch
   *
   * stored hai.
   *
   * Example:
   * "BAT-1784355930903"
   */
  const studentBatch = String(studentData?.batch ?? "").trim();

  /*
   * Student ka actual batch find karo.
   *
   * Hum ID, batchId aur name tino check kar rahe hain
   * taaki existing data structure ke saath compatible rahe.
   */
  const currentBatch: any = useMemo(() => {
    if (!studentBatch || !Array.isArray(batches)) {
      return null;
    }

    return (
      batches.find((batch: any) => {
        const id = String(batch?.id ?? "").trim();
        const batchId = String(batch?.batchId ?? "").trim();
        const name = String(batch?.name ?? "").trim();

        return (
          id === studentBatch ||
          batchId === studentBatch ||
          name === studentBatch
        );
      }) ?? null
    );
  }, [batches, studentBatch]);

  /*
   * Batch se YouTube playlist URL
   */
  const playlistUrl = String(
    currentBatch?.playlistUrl ??
      currentBatch?.youtubePlaylistUrl ??
      currentBatch?.youtubePlaylist ??
      ""
  ).trim();

  /*
   * Playlist ID extract
   */
  const playlistId = useMemo(() => {
    if (!playlistUrl) return null;

    try {
      const url = new URL(playlistUrl);
      return url.searchParams.get("list");
    } catch {
      return null;
    }
  }, [playlistUrl]);

  /*
   * YouTube playlist load
   */
  useEffect(() => {
    async function loadPlaylist() {
      if (!playlistId) {
        setVideos([]);
        setLoadingVideos(false);
        return;
      }

      const apiKey =
        process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

      if (!apiKey) {
        setError(
          "YouTube API key is not configured."
        );
        setLoadingVideos(false);
        return;
      }

      try {
        setLoadingVideos(true);
        setError("");

        let allVideos: YouTubeVideo[] = [];
        let nextPageToken = "";

        do {
          const params = new URLSearchParams({
            part: "snippet,contentDetails",
            playlistId,
            maxResults: "50",
            key: apiKey,
          });

          if (nextPageToken) {
            params.set(
              "pageToken",
              nextPageToken
            );
          }

          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data?.error?.message ||
                "Unable to load YouTube playlist."
            );
          }

          const items = Array.isArray(data.items)
            ? data.items
            : [];

          const newVideos: YouTubeVideo[] =
            items
              .filter(
                (item: any) =>
                  item?.contentDetails?.videoId
              )
              .map((item: any) => ({
                id: item.contentDetails.videoId,

                title:
                  item.snippet?.title ||
                  "Untitled Recording",

                description:
                  item.snippet?.description || "",

                thumbnail:
                  item.snippet?.thumbnails?.high?.url ||
                  item.snippet?.thumbnails?.medium?.url ||
                  item.snippet?.thumbnails?.default?.url ||
                  "",

                publishedAt:
                  item.snippet?.publishedAt || "",
              }));

          allVideos.push(...newVideos);

          nextPageToken =
            data.nextPageToken || "";
        } while (nextPageToken);

        setVideos(allVideos);
      } catch (err: any) {
        console.error(
          "YouTube playlist error:",
          err
        );

        setError(
          err?.message ||
            "Unable to load recordings."
        );
      } finally {
        setLoadingVideos(false);
      }
    }

    loadPlaylist();
  }, [playlistId]);

  /*
   * Overall loading
   */
  if (dataLoading || loadingVideos) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="aspect-video animate-pulse bg-gray-200" />

              <div className="space-y-3 p-5">
                <div className="h-5 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /*
   * Student batch missing
   */
  if (!studentBatch) {
    return (
      <EmptyState
        icon={Video}
        title="Batch not assigned"
        description="Your account is not assigned to a batch yet."
      />
    );
  }

  /*
   * Batch document not found
   */
  if (!currentBatch) {
    return (
      <EmptyState
        icon={Video}
        title="Batch not found"
        description={`No batch was found for ${studentBatch}.`}
      />
    );
  }

  /*
   * Playlist not added by admin
   */
  if (!playlistId) {
    return (
      <EmptyState
        icon={Video}
        title="No recordings available"
        description="Your batch playlist has not been added yet."
      />
    );
  }

  /*
   * YouTube API error
   */
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load recordings
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  /*
   * Playlist empty
   */
  if (!videos.length) {
    return (
      <EmptyState
        icon={Video}
        title="No recordings available"
        description="New class recordings will automatically appear here."
      />
    );
  }

  /*
   * Video player
   */
  if (selectedVideo) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedVideo(null)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back to recordings
        </button>

        <div className="overflow-hidden rounded-2xl bg-black shadow-xl">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                selectedVideo.id
              )}?autoplay=1&rel=0`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedVideo.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {currentBatch?.name ||
              currentBatch?.batchName ||
              studentBatch}
          </p>

          {selectedVideo.description && (
            <div className="mt-5 rounded-2xl bg-gray-50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                {selectedVideo.description}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /*
   * Recordings list
   */
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Class Recordings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {currentBatch?.name ||
            currentBatch?.batchName ||
            "Your batch"}{" "}
          recordings
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() =>
              setSelectedVideo(video)
            }
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#6C3CE9] shadow-lg transition group-hover:scale-110">
                  <PlayCircle size={32} />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 rounded-lg bg-black/75 px-3 py-1 text-xs font-semibold text-white">
                Class {index + 1}
              </div>
            </div>

            <div className="p-5">
              <h2 className="line-clamp-2 font-semibold text-gray-900">
                {video.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Watch recording
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}