import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Ticket,
  BarChart3,
  Lock,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
   return (
      <div className="min-h-screen bg-background">
         {/* Max width container */}
         <div className="mx-auto max-w-[1440px]">
            {/* Hero Section with wavy background and decorative circles */}
            <section className="relative overflow-hidden bg-linear-to-br from-purple-100 to-blue-90 pb-32 pt-20">
               {/* Wavy bottom edge using clip-path */}
               <div
                  className="absolute inset-0 bg-linear-to-br from-purple-100 to-blue-600"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
               />

               {/* Decorative circle - left side, in hero */}
               <div className="absolute  top-[50px] h-[250px] w-[250px] rounded-full bg-purple-400/40 blur-lg" />

               {/* Decorative circle - right side, overlapping hero section */}
               <div className="absolute right-[-50px] top-[200px] h-[400px] w-[400px] rounded-full bg-pink-400/30 blur-lg" />

               {/* Hero Content */}
               <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                  {/* Logo/Brand */}
                  <div className="mb-8 flex items-center justify-center gap-2">
                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
                        <Ticket className="h-6 w-6 text-background" />
                     </div>
                     <span className="text-2xl font-bold text-foreground">
                        TicketFlow
                     </span>
                  </div>

                  {/* Main Heading */}
                  <h1 className="mb-6 text-balance text-5xl font-bold leading-tight text-foreground md:text-6xl">
                     Streamline Your Support, One Ticket at a Time
                  </h1>

                  {/* Subheading */}
                  <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                     Efficiently manage customer inquiries, track progress, and enhance
                     team collaboration with TicketFlow's intuitive platform.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                     <Button
                        variant="outline"
                        size="lg"
                        className="min-w-[120px] bg-white"
                        onClick={()=>window.location.href = '/login'}
                     >
                        Login
                     </Button>
                     <Button
                        onClick={() => window.location.href = '/signup'}
                        size="lg"
                        className="min-w-[120px] bg-indigo-600 hover:bg-indigo-700"
                     >
                        Get Started
                     </Button>
                  </div>
               </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-20">
               <div className="mx-auto max-w-6xl">
                  <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
                     Key Features Designed for You
                  </h2>

                  <div className="grid gap-8 md:grid-cols-3">
                     {/* Feature 1 */}
                     <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                        <div className="mb-6 flex justify-center">
                           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                              <svg
                                 className="h-8 w-8 text-indigo-600"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                 />
                              </svg>
                           </div>
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-foreground">
                           Fast Ticket Resolution
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                           Automate workflows and prioritize urgent issues to ensure your
                           team resolves tickets faster and more efficiently.
                        </p>
                     </Card>

                     {/* Feature 2 */}
                     <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                        <div className="mb-6 flex justify-center">
                           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                              <BarChart3 className="h-8 w-8 text-indigo-600" />
                           </div>
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-foreground">
                           Analytics Dashboard
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                           Gain deep insights into your support operations with powerful
                           dashboards and reports, helping you make data-driven
                           decisions.
                        </p>
                     </Card>

                     {/* Feature 3 */}
                     <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                        <div className="mb-6 flex justify-center">
                           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                              <Lock className="h-8 w-8 text-indigo-600" />
                           </div>
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-foreground">
                           Secure Access
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                           Protect your sensitive data with robust security features,
                           ensuring that only authorized personnel can access critical
                           information.
                        </p>
                     </Card>
                  </div>
               </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-6 py-12">
               <div className="mx-auto max-w-6xl">
                  <div className="gap-8 flex flex-wrap justify-between">
                     {/* Brand Column */}
                     <div className="md:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                              <Ticket className="h-5 w-5 text-background" />
                           </div>
                           <span className="text-lg font-bold text-foreground">
                              TicketFlow
                           </span>
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">
                           Streamline your support, one ticket at a time.
                        </p>
                        <div className="flex gap-4">
                           <Link
                              to="#"
                              className="text-muted-foreground hover:text-foreground"
                           >
                              <Facebook className="h-5 w-5" />
                           </Link>
                           <Link
                              to="#"
                              className="text-muted-foreground hover:text-foreground"
                           >
                              <Twitter className="h-5 w-5" />
                           </Link>
                           <Link
                              to="#"
                              className="text-muted-foreground hover:text-foreground"
                           >
                              <Linkedin className="h-5 w-5" />
                           </Link>
                        </div>
                     </div>

                     {/* Product Column */}
                     <div>
                        <h4 className="mb-4 font-bold text-foreground">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Features
                              </Link>
                           </li>
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Integrations
                              </Link>
                           </li>
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Pricing
                              </Link>
                           </li>
                        </ul>
                     </div>

                     {/* Resources Column */}
                     <div>
                        <h4 className="mb-4 font-bold text-foreground">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Blog
                              </Link>
                           </li>
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Documentation
                              </Link>
                           </li>
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Support
                              </Link>
                           </li>
                        </ul>
                     </div>

                     {/* Company Column */}
                     <div>
                        <h4 className="mb-4 font-bold text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 About Us
                              </Link>
                           </li>
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Careers
                              </Link>
                           </li>
                           <li>
                              <Link to="#" className="hover:text-foreground">
                                 Contact
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>

                  {/* CTA Section */}
                  <div className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
                     <h3 className="mb-2 text-2xl font-bold text-foreground">
                        Ready to streamline your support?
                     </h3>
                     <Button onClick={() => window.location.href = '/signup'} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                        Get Started
                     </Button>
                  </div>

                  {/* Copyright */}
                  <div className="mt-8 border-border pt-8 text-center text-sm text-muted-foreground">
                     © 2025 TicketFlow. All rights reserved.
                  </div>
               </div>
            </footer>
         </div>
      </div>
   );
}
