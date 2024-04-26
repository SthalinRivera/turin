import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../../components/NavBar";
import { Modal } from "../../components/Modal";
import "../../index.css";
import fondo from '../../asset/images/fondo.png'
import illustration_intro from "../../asset/images/illustration-intro.svg";
import { Link } from "react-router-dom";
export function Portal() {
  const { logout, user } = useAuth();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <NavBar />

      <div class="">
        <div class="relative isolate px-6 pt-6 lg:px-8">

          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Generador de matriz de consistencia </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">Empieza una nueva aventura de investigación soporta con Inteligencia Artificial.</p>

              <div class=" mt-6 relative ">
                <Link to="/login">
                  <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-2 px-4 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 pr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                    <span>Start Generate</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <header>
          <section class="wrapper grid gap-8 justify-items-center items-center pb-12 md:grid-cols-2 md:py-24">

            <img src={illustration_intro} class="w-full max-w-lg md:order-1" />

            <article class="text-center space-y-6 md:text-left md:space-y-8">

              <h1 class="text-4xl font-bold text-very-dark-blue md:text-5xl">Bring everyone together to build better products.
              </h1>

              <p class="text-dark-grayish-blue">Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.
              </p>

              <a href="#" class="button mx-auto shadow-xl shadow-bright-red/30 md:mx-0">Get Started</a>

            </article>

          </section>

        </header>


        <main>

          <section class="wrapper text-center py-24 grid gap-12 md:grid-cols-2 md:text-left">

            <article>

              <h2 class="text-3xl font-bold text-very-dark-blue mb-6 md:text-4xl">What’s different about Manage?
              </h2>

              <p class="text-dark-grayish-blue">Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.</p>

            </article>

            <div class="grid gap-12">

              <article class="space-y-4 md:space-y-6">

                <p class="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                  <span class="bg-bright-red text-white px-6 rounded-full py-2">
                    01
                  </span>
                  <span class="flex-1 p-2">
                    Track company-wide progress
                  </span>
                </p>

                <p class="text-dark-grayish-blue text-left">See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.</p>

              </article>

              <article class="space-y-4 md:space-y-6">

                <p class="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                  <span class="bg-bright-red text-white px-6 rounded-full py-2">
                    02
                  </span>
                  <span class="flex-1 p-2">
                    Advanced built-in reports
                  </span>
                </p>

                <p class="text-dark-grayish-blue text-left">Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.

                </p>

              </article>

              <article class="space-y-4 md:space-y-6">

                <p class="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                  <span class="bg-bright-red text-white px-6 rounded-full py-2">
                    03
                  </span>
                  <span class="flex-1 p-2">
                    Everything you need in one place
                  </span>
                </p>

                <p class="text-dark-grayish-blue text-left">Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.

                </p>

              </article>


            </div>

          </section>


          <section class="wrapper text-center py-24 max-w-lg mx-auto md:max-w-xl">

            <h2 class="text-3xl font-bold text-very-dark-blue md:text-4xl">What they’ve said
            </h2>

            <div class="mt-24 mb-14">

              <article class="bg-vary-light-gray pt-16 pb-12 px-4 relative">

                <img src="../../asset/images/avatar-ali.png" class="absolute w-24 aspect-square -top-12 inset-x-0 mx-auto" />

                <h3 class="text-xl mb-4 pt-2 font-bold text-very-dark-blue">Ali Bravo
                </h3>

                <p class="text-dark-grayish-blue">“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”</p>

              </article>

            </div>

            <a href="#" class="button mx-auto shadow-xl shadow-bright-red/30">Get Started</a>
          </section>

          <section class="bg-bright-red font-bold">

            <div class="wrapper py-24 text-center grid gap-6 md:grid-cols-[40%_40%] md:justify-between md:items-center md:text-left">

              <h2 class="text-4xl text-very-pale-red">Simplify how your team works today.
              </h2>

              <a href="#" class="button text-bright-red bg-vary-light-gray mx-auto md:mx-0 md:justify-self-end">Get Started</a>

            </div>

          </section>
        </main>

        <footer class="bg-very-dark-blue py-24">
          <section class="wrapper grid gap-12 justify-items-center footer-area md:footer-area-md md:grid-cols-3 md:justify-items-stretch">

            <form class="flex gap-4 w-full min-w-[100px] [grid-area:form]">
              <input type="email" placeholder="Updates in your inbox…" class="min-w-[50px] flex-1 rounded-full px-4" />
              <input type="submit" value="GO" class="py-3 px-8 bg-bright-red rounded-full text-white" />

            </form>

            <nav class="grid grid-cols-[max-content_max-content] gap-y-4 justify-between text-white w-4/5 [grid-area:navigation] md:w-full">
              <a href="#">Home</a>
              <a href="#">Pricing</a>
              <a href="#">Products</a>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Community</a>
              <a href="#">Privacy Policy</a>
            </nav>

            <div class="flex flex-wrap gap-4 justify-between w-full [grid-area:social-media]">

              <a href="#">
                <img src="../../asset/images/icon-facebook.svg" class="w-8" />
              </a>
              <a href="#">
                <img src="../../asset/images/icon-youtube.svg" class="w-8" />
              </a>
              <a href="#">
                <img src="../../asset/images/icon-twitter.svg" class="w-8" />
              </a>
              <a href="#">
                <img src="../../asset/images/icon-pinterest.svg" class="w-8" />
              </a>
              <a href="#">
                <img src="../../asset/images/icon-instagram.svg" class="w-8" />
              </a>

            </div>

            <a href="#" class="[grid-area:logo]">
              <img src="../../asset/images/logo-white.svg" class="" />
              <img src="../../asset/images/logo-white.svg" class="" />
            </a>

            <p class="text-dark-grayish-blue text-center [grid-area:copy] md:text-right">Copyright 2020. All Rights Reserved</p>
          </section>
        </footer>

      </div >

    </div>
  );
}
