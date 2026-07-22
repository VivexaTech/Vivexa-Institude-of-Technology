"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CalendarClock, Radio } from "lucide-react";
import { db } from "@/lib/firebase";
import { usePortalAuth } from "@/context/PortalAuthContext";
import { usePortalData } from "@/context/PortalDataContext";

export default function ClassesPage() {
  const { studentData } = usePortalAuth(); const data = usePortalData(); const [courseId, setCourseId] = useState(data.enrolledCourse?.courseId ?? ""); const [sent, setSent] = useState(false);
  async function requestLeave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const course = data.enrolledCourses.find((item) => item.courseId === courseId);
    await addDoc(collection(db, "leave_requests"), { studentId: studentData?.studentId, studentName: studentData?.fullName, courseId, courseTitle: course?.title, batchId: course?.batchId, batchName: course?.batch, leaveDate: String(form.get("date")), reason: String(form.get("reason")), status: "pending", createdAt: serverTimestamp() });
    event.currentTarget.reset(); setSent(true);
  }
  return <div className="grid gap-6 xl:grid-cols-3"><section className="space-y-4 xl:col-span-2"><h2 className="text-2xl font-black">Classes</h2>{data.classes.map((item) => { const live = item.id === data.liveClass?.id; return <article key={item.id} className={`rounded-2xl border bg-white p-5 shadow-sm ${live ? "border-red-200" : "border-slate-200"}`}><div className="flex gap-4"><span className={`grid size-12 place-items-center rounded-xl ${live ? "bg-red-50 text-red-600" : "bg-violet-50 text-[#6C3CE9]"}`}>{live ? <Radio /> : <CalendarClock />}</span><div><h3 className="font-black">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.topic} · {item.date} {item.time}</p><p className="mt-1 text-xs text-slate-500">{item.instructor}</p></div>{live && item.meetLink && <a href={item.meetLink} target="_blank" rel="noreferrer" className="ml-auto self-center rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white">Join live</a>}</div></article>})}{!data.classes.length && <p className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500">No classes scheduled.</p>}</section><aside className="rounded-2xl border bg-white p-6 shadow-sm xl:sticky xl:top-24 xl:h-fit"><h3 className="font-black">Request leave</h3><p className="mt-1 text-sm text-slate-500">Notify the institute before your class.</p>{sent && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">Leave request submitted.</p>}<form onSubmit={requestLeave} className="mt-5 space-y-4"><select value={courseId} onChange={(event) => setCourseId(event.target.value)} className="w-full rounded-xl border px-3 py-3">{data.enrolledCourses.map((course) => <option key={course.courseId} value={course.courseId}>{course.title}</option>)}</select><input name="date" type="date" required className="w-full rounded-xl border px-3 py-3" /><textarea name="reason" required placeholder="Reason" className="w-full rounded-xl border px-3 py-3" /><button className="w-full rounded-xl bg-[#6C3CE9] py-3 font-bold text-white">Submit request</button></form></aside></div>;
}
