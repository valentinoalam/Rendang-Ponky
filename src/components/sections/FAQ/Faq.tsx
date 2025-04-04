'use client';
import Link from 'next/link';
import React, { useState } from 'react'

const Faq = () => {
        // State to manage which FAQ is currently open
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    // Function to toggle FAQ open/close
    const toggleFAQ = (index: number) => {
        // Toggle the FAQ: if already open, close it; if closed, open it.
        setOpenFAQ(openFAQ === index ? null : index);
    };

    // FAQs array
    const faqs = [
        {
        question: "How this theme is different from others in market?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
        {
        question: "What is your policy on distribution of Devjoy assets?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
        {
        question: "How can I contribute to Devjoy?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
        {
        question: "What other themes do you have?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna",
        },
    ];

    return (
        <section>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 md:px-10 md:py-20">
            <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
            <p className="font-inter mb-2 text-center text-sm font-medium">
                FAQs
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-black">
                Frequently Asked Questions
            </h2>
            <p className="font-inter mt-4 max-w-xl px-5 text-base font-light text-gray-500 lg:max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                purus sit amet luctus venenatis, lectus magna fringilla urna
            </p>
            </div>
            <div className="mt-10 flex w-full flex-col">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="relative my-3 w-full rounded-md px-12 py-8"
                >
                    <div className="max-w-2xl">
                    <h2
                        className="text-xl font-bold text-black"
                        onClick={() => toggleFAQ(index)}
                    >
                        {faq.question}
                    </h2>
                    {openFAQ === index && (
                        <p className="font-inter mt-4 text-base font-light text-gray-500">
                        {faq.answer}
                        </p>
                    )}
                    </div>
                    <button
                    className="absolute right-5 top-9 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="12" fill="white"></circle>
                        <path
                        d="M7.04688 11.9999H16.9469"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        ></path>
                        {openFAQ !== index && (
                        <path
                            d="M12 7.05005V16.95"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        )}
                    </svg>
                    </button>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                </div>

            ))}
            </div>
            <p className="font-inter mx-auto mt-12 text-center text-base text-gray-500">
            Can’t find the answer you’re looking for? Reach out to our
            <Link href="#" className="text-black font-bold">
                {" "}
                customer support team.
            </Link>
            </p>
        </div>
        </section>
    );
}

export default Faq