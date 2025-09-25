import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "Apa itu RENDANGPONKY?",
    answer:
      "RENDANGPONKY adalah brand makanan siap saji khas Indonesia yang menghadirkan rendang kemasan dengan kualitas Premium, menggunakan resep tradisional dengan cita rasa Nusantara yang cocok di lidah semua kalangan.",
  },
  {
    question: "Apa saja varian produk RENDANGPONKY?",
    answer: "Saat ini kami memiliki dua varian: -Rendang Daging Sapi 250g (isi ±5 potong) -Rendang Paru 250g",
  },
  {
    question: "Daging jenis apa yang digunakan untuk rendang daging sapi?",
    answer:
      "Kami menggunakan daging sapi silverside pilihan yang empuk, tetapi tetap padat dan tidak mudah hancur saat dimasak atau dipanaskan kembali.",
  },
  {
    question: "Apakah RENDANGPONKY mengandung bahan pengawet?",
    answer:
      "Tidak. RENDANGPONKY bebas bahan pengawet. Ketahanan produk didapat dari proses sterilisasi modern menggunakan mesin khusus (sistem retort).",
  },
  {
    question: "Apa itu sistem retort?",
    answer:
      "Sistem retort adalah metode sterilisasi makanan dengan tekanan dan suhu tinggi, yang membuat makanan aman, higienis, dan tahan lama tanpa bahan tambahan kimia.",
  },
  {
    question: "Berapa lama masa simpan RENDANGPONKY?",
    answer: "Produk kami dapat bertahan hingga 12 bulan di suhu ruang selama kemasan belum dibuka.",
  },
  {
    question: "Apakah produk ini perlu disimpan di kulkas?",
    answer:
      "Tidak perlu. Cukup simpan di tempat sejuk dan kering. Namun, setelah dibuka, simpan di kulkas dan habiskan maksimal dalam 3 hari.",
  },
  {
    question: "Bagaimana cara menyajikan RENDANGPONKY?",
    answer:
      "Rendang bisa langsung dikonsumsi, atau jika ingin lebih nikmat, panaskan sebentar dengan microwave, dikukus, atau direndam dalam air panas beserta kemasannya.",
  },
  {
    question: "Apakah produk ini halal?",
    answer:
      "Ya. Kami menggunakan bahan-bahan halal dan proses produksi higienis sesuai standar dan sudah bersertifikat Halal dari MUI.",
  },
  {
    question: "Apakah RENDANGPONKY cocok untuk oleh-oleh atau stok makanan darurat?",
    answer:
      "Tentu! Dengan kemasan praktis dan masa simpan lama, RENDANGPONKY sangat cocok sebagai oleh-oleh, bekal perjalanan, atau makanan darurat di rumah.",
  },
  {
    question: "Di mana saya bisa membeli RENDANGPONKY?",
    answer: "Anda dapat membeli langsung melalui [masukkan info: marketplace, website, atau kontak WhatsApp Anda].",
  },
]

export function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80 rounded-4xl backdrop-blur-2xl">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance">
              FREQUENTLY ASKED QUESTIONS (F&Q) – RENDANGPONKY
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pretty">
              Find answers to the most common questions about RENDANGPONKY.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
