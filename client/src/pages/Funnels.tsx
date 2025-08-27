import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Funnels from "@/components/Funnels";

export default function FunnelsPage() {
  return (
    <>
      <Helmet>
        <title>Strategic Sales Funnel Solutions | Fusion Data Co</title>
        <meta name="description" content="Complete sales funnel management platform with color-coded pipelines, systematic qualification processes, and automated nurture sequences. Stop losing qualified prospects and start closing more deals." />
        <meta name="keywords" content="sales funnels, lead qualification, pipeline management, sales automation, conversion optimization, revenue forecasting, sales process" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Funnels />
        </main>
        <Footer />
      </div>
    </>
  );
}