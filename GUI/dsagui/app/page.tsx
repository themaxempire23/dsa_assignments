"use client"
import {useState} from "react";
import {Footer} from "@/public/components/Footer";

export default function Home() {
    const [showAssignment1Options, setShowAssignment1Options] = useState(false);
    const [showAssignment2Options, setShowAssignment2Options] = useState(false);

    return (
        <main className="flex min-h-screen flex-col">
            <div className="flex flex-col gap-2 items-center justify-center flex-grow p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        DISTRIBUTED SYSTEMS & APPLICATIONS&nbsp;
                        <code className="font-mono font-bold">GUIs</code>
                    </p>
                </div>

                <div className="grid text-center lg:w-full lg:max-w-5xl lg:grid-cols-1 lg:text-left">
                    {/* Assignment 1 */}
                    <div className="mb-4">
                        <button
                            onClick={() => setShowAssignment1Options(!showAssignment1Options)}
                            className="group w-full rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        >
                            <h2 className="mb-3 text-2xl font-semibold">
                                Assignment 1{" "}
                                <span
                                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
                            </h2>
                            <p className="m-0 max-w-[30ch] text-sm opacity-50">
                                REST_API & GRPC
                            </p>
                        </button>

                        {showAssignment1Options && (
                            <div className="mt-2 space-y-2">
                                <a
                                    href="/Assignment1/RestApi"
                                    className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    <h3 className="text-xl font-semibold">REST API</h3>
                                </a>
                                <a
                                    href="/Assignment1/GrPc"
                                    className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    <h3 className="text-xl font-semibold">GRPC</h3>
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Assignment 2 */}
                    <div>
                        <button
                            onClick={() => setShowAssignment2Options(!showAssignment2Options)}
                            className="group w-full rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        >
                            <h2 className="mb-3 text-2xl font-semibold">
                                Assignment 2{" "}
                                <span
                                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
                            </h2>
                            <p className="m-0 max-w-[30ch] text-sm opacity-50">
                                Assignment Details
                            </p>
                        </button>

                        {showAssignment2Options && (
                            <div className="mt-2 space-y-2">
                                <a
                                    href="/Assignment2/RandomName1"
                                    className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    <h3 className="text-xl font-semibold">Random Name 1</h3>
                                </a>
                                <a
                                    href="/Assignment2/RandomName2"
                                    className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    <h3 className="text-xl font-semibold">Random Name 2</h3>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="py-2">
                <Footer/>
            </div>
        </main>
    );
}
