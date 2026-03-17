import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <section className="relative flex h-[450px] w-full items-center justify-center overflow-hidden lg:h-auto lg:w-1/2">
                {/* <section className="relative hidden w-1/2 items-center justify-center p-10 lg:flex xl:w-1/2 overflow-hidden"> */}
                {/* 🎥 Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/freaky.mp4" type="video/mp4" />
                </video>

                {/* 🔥 Overlay sombre (optionnel mais recommandé) */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* <section className="hidden w-1/2 items-center justify-center bg-greens-95 p-10 lg:flex xl:w-1/2"> */}
                <div className="relative z-10 flex max-w-[430px] flex-col items-center space-y-6 p-6 text-center text-white lg:items-start lg:text-left lg:p-10">
                    {/* <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          /> */}

                    <div className="space-y-5 text-white">
                        <h1 className="h1">Prêt pour te faire taper la bite ..??</h1>
                        <p className="body-1">
                            Inscris-toi ou Connecte-toi pour continuer ...
                        </p>
                    </div>
                    {/* <Image
                        src="/assets/images/files.png"
                        alt="Files"
                        width={342}
                        height={342}
                        className="transition-all hover:rotate-3 hover:scale-105"
                    /> */}
                </div>
            </section>

            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                {/* <div className="mb-16 ">
          <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div> */}

                {children}
            </section>
        </div>
    );
};

export default Layout;
