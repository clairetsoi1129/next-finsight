import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Track your investment porfolio
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"></span>
      </h1>
      <p className="desc text-center">
        Next finsight is an open-source investment portfolio dashboard
      </p>
    </section>
  );
}
