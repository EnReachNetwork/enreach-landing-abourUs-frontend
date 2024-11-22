import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "motion/react";
import clsx from "clsx";
import { methods } from "./config/about";
import useMobileDetect from "./hooks/useMobileDetect";
import { Subscribe } from "./components/Subscribe";

const list = [
    { title: 'WHY WE EXIST', subTitle: 'Pioneering the Edge Cloud for the AI Era', text: 'EnReach bridges the gap between centralized cloud systems and the needs of next-generation applications. As AI reshapes industries, we bring the cloud closer to users, enabling instant responses, seamless interactions, and scalable performance. By creating an globally-connected edge cloud, we empower the AI-driven world with infrastructure designed for speed, flexibility, and accessibility.' },
    { title: 'WHAT DRIVES US', subTitle: 'Accelerating Innovation with Edge-First Infrastructure', text: 'The cloud is too “far” to deliver the real-time responsiveness today’s digital experiences demand. EnReach is leading the shift from centralized clouds to edge-first networks, unlocking real-time capabilities and efficiency for AI and next-gen applications. Our edge cloud transforms fragmented resources into a seamless, scalable system, ensuring the future of innovation happens where it’s needed most—right at the edge. ' },
    { title: `HOW WE'RE DOING IT`, subTitle: 'Shaping an Open Edge Ecosystem', },
]


function About() {
    const { scrollY } = useScroll();
    const ref = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState([0, 0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useMobileDetect()

    useEffect(() => {
        if (ref.current) {
            const start = ref.current.offsetTop;
            const end = start + ref.current.getBoundingClientRect().height;
            setScrollRange([start, end]);
        }
    }, [])

    const scrollProgress = useTransform(scrollY, scrollRange, [0, 1]);

    useEffect(() => {
        scrollProgress.on('change', v => {
            if (v > 1 / 3 && v < 2 / 3) {
                setCurrentIndex(1)
            } else if (v > 2 / 3 && v < 3 / 3) {
                setCurrentIndex(2)
            } else {
                setCurrentIndex(0)
            }
        })
    }, [])

    return <div className="pt-40 ">

        {!isMobile ?
            <div ref={ref} className="container md:!px-0 relative block sm:hidden lg:pb-72 h-[4000px] w-full " >
                <section className="sticky flex flex-col h-screen top-24 2xl:top-30 bg-[url(./earth.png)]  bg-no-repeat bg-right-top  ">

                    <div className="flex flex-col gap-32 lg:flex-row">
                        <div className="flex justify-between mt-16 lg:flex-col lg:gap-8 2xl:gap-16 lg:justify-start">
                            <div className="flex flex-col">
                                {list.map((item, index) => {
                                    return <div style={{
                                        opacity: currentIndex === index ? 1 : 0.5,
                                        transition: 'all 1s ease-in-out',
                                    }}
                                        className={clsx("architecture__item p-4", currentIndex === index ? ' max-w-[750px] ' : 'border-transparent max-w-[750px]')} key={index}

                                    >

                                        <div className="flex flex-col">
                                            <div>
                                                <div className="about-title">{item.title}</div>
                                                <div className="about-subtitle">{item.subTitle}</div>

                                                <p className="text-base leading-relaxed about-content">
                                                    {item.text}

                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            :
            <>
                <img src="./mo-earth.png " className="hidden sm:block" />

                <div ref={ref} className="container hidden sm:block" >
                    <div className="flex flex-col gap-32 lg:flex-row">
                        <div className="flex justify-between mt-16 lg:flex-col lg:gap-8 2xl:gap-16 lg:justify-start">
                            <div className="flex flex-col gap-[100px]">
                                {list.map((item) => {
                                    return <div
                                    >

                                        <div className="flex flex-col">
                                            <div>
                                                <div className="leading-10 about-title">{item.title}</div>
                                                <div className="about-subtitle">{item.subTitle}</div>

                                                <p className="text-base leading-relaxed about-content">
                                                    {item.text}

                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </>

        }
        <div className="container md:!px-0 mt-20">
            <div className="grid grid-cols-1 gap-16 sm:gap-[27px]  mt-[-250px] lg:grid-cols-2">
                {methods.map((method, index) => (
                    <div key={index} className="p-8 about-method sm:p-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full">
                            <method.icon />
                        </div>

                        <div className="mt-8 text-xl about-method-title">{method.title}</div>
                        <div className="mt-4 text-base text-[#F3F3F380] about-method-content">{method.content}</div>
                    </div>
                ))}
            </div>
        </div>
        <Subscribe />

    </div>
}

export default About