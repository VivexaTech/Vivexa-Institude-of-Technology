"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { usePortalData } from "@/context/PortalDataContext";
import { EmptyState } from "@/components/portal/EmptyState";

export default function RecordingsPage() {
  const { recordings } = usePortalData();
  return <div><h2 className="text-2xl font-black">Class recordings</h2><p className="mt-1 text-sm text-slate-500">Replay sessions whenever you need</p>{recordings.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{recordings.map((item) => <Link href={`/portal/recordings/${item.id}`} key={item.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="grid aspect-video place-items-center bg-gradient-to-br from-violet-100 to-indigo-100 text-[#6C3CE9]"><PlayCircle size={48} /></div><div className="p-5"><h3 className="font-black">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.date} · {item.duration}</p><p className="mt-4 text-sm font-bold text-[#6C3CE9]">Watch recording →</p></div></Link>)}</div> : <div className="mt-6"><EmptyState icon={PlayCircle} title="No recordings available" description="Completed class recordings will appear here." /></div>}</div>;
}
