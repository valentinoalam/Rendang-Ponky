import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  content: string;
  avatarUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

const testimonials: Testimonial[] = [
  {
    name: "Anna",
    location: "Jakarta",
    content: "Rasanya persis seperti buatan nenek! Langganan tiap bulan!",
    rating: 5,
  },
  {
    name: "Budi",
    location: "Surabaya",
    content: "Rendang paru nya kriuk di luar, lembut di dalam. Ga ada tandingannnya!",
    rating: 5,
  },
  {
    name: "Cindy",
    location: "Bandung",
    content: "Praktis banget, tinggal panaskan. Sudah 3 kali reorder. Keluarga suka!",
    rating: 4,
  },
  {
    name: "Denny",
    location: "Medan",
    content: "Walau saya orang Medan yang kuat pedas, rendang ini tetap juara! Bumbunya meresap sampai ke dalam.",
    rating: 5,
  },
];

const TestimonialCarousel: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border-rendang-golden/30 hover:border-rendang-golden transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      {testimonial.avatarUrl ? (
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      ) : (
                        <AvatarFallback className="bg-rendang-cream text-rendang-maroon">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-rendang-darkbrown">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-rendang-darkbrown/70">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-rendang-darkbrown italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="static mr-2 translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
};

export default TestimonialCarousel;