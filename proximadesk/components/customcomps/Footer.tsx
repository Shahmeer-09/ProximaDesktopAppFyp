"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowRight, Mail } from "lucide-react";
import Logo from "./global/Logo";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    // Reset form
    setEmail("");
  };

  return (
    <footer className="w-full bg-gray-50 text-gray-700 py-16 px-8 md:px-16 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Logo and description */}
          <div className="max-w-sm">
            <Logo/>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We create digital experiences that matter. Join our community 
              to receive the latest updates and insights.
            </p>
          </div>

          {/* Newsletter subscription */}
          <div className="w-full md:w-96">
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center border-b border-gray-300 dark:border-gray-700 focus-within:border-gray-800 dark:focus-within:border-gray-400 transition-colors">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 p-3 bg-transparent outline-none text-sm"
                />
                <button
                  type="submit"
                  className="p-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        {/* Middle Section with Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {/* Quick Links Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-6">Connect</h4>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Relume. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;