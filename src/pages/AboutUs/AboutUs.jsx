import React from 'react';

import { Layout } from '../../components/Layout';

export function AboutUs() {
  return (
    <Layout>
      <section className="min-h-screen mx-16 md:mx-60 my-8">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <div className="flex flex-col flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Overview</h2>
            <p className="text-justify">
              This website is intended for completed platinum challenge from Study Independen at
              Binar Academy, which is part of Kampus Merdeka by Kemendikbud.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">The Challenges</h2>
            <p className="text-justify">
              In this platinum challenge, we are collaborating with Backend and Frontend students to
              build a <span className="font-medium">Flights Booking App</span> and we named it{' '}
              <span className="font-medium">Terbang Tinggi</span>.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Tech Stack</h2>
            <p>This app is build using these technology</p>
            <ul className="list-disc list-inside">
              <li>React</li>
              <li>Tailwind</li>
              <li>Redux</li>
              <li>Express</li>
              <li>Postgresql</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">The Teams</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap flex-col">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div>
                  <figure>
                    <img
                      src="https://placekitten.com/250/250"
                      alt="Kitten 1"
                      className="rounded-lg"
                    />
                    <figcaption>Aroyan &bull; Frontend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src="https://placekitten.com/250/250"
                      alt="Kitten 1"
                      className="rounded-lg"
                    />
                    <figcaption>Aroyan &bull; Frontend</figcaption>
                  </figure>
                </div>{' '}
                <div>
                  <figure>
                    <img
                      src="https://placekitten.com/250/250"
                      alt="Kitten 1"
                      className="rounded-lg"
                    />
                    <figcaption>Aroyan &bull; Frontend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src="https://placekitten.com/250/250"
                      alt="Kitten 1"
                      className="rounded-lg"
                    />
                    <figcaption>Aroyan &bull; Frontend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src="https://placekitten.com/250/250"
                      alt="Kitten 1"
                      className="rounded-lg"
                    />
                    <figcaption>Aroyan &bull; Frontend</figcaption>
                  </figure>
                </div>{' '}
                <div>
                  <figure>
                    <img
                      src="https://placekitten.com/250/250"
                      alt="Kitten 1"
                      className="rounded-lg"
                    />
                    <figcaption>Aroyan &bull; Frontend</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
