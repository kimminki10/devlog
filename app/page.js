import SummaryList from "@/components/SummaryList";
import YouTubeSummary from "@/components/YouTubeSummary";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-36">
      <h1 className="text-2xl font-bold mb-4">YouTube Video Summarizer</h1>
      <YouTubeSummary />
      <div className="flex flex-wrap justify-center">
        <SummaryList />
      </div>
    </main>
  );
}
