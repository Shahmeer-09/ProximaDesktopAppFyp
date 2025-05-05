import React from "react";
import {
  Folder,
  User,
  Video,
  Bot,
  Users,
  FileVideo,
  Infinity,
  Download,
  Cloud,
  Shield,
  Star,
} from "lucide-react";
import Link from "next/link";

const PricingPlans = () => {
  const PlanFeature = ({ icon, text, isPro = false }) => (
    <li
      className={`flex items-center gap-3 py-2 ${
        isPro ? "text-white" : "text-zinc-300"
      }`}
    >
      <div
        className={`rounded-full p-1 ${
          isPro ? "bg-purple-500/20" : "bg-zinc-700"
        }`}
      >
        {icon}
      </div>
      <span>{text}</span>
    </li>
  );

  // const Tooltip = ({ content }) => (
  //   <div className="group relative flex items-center">
  //     <HelpCircle size={16} className="ml-1 text-zinc-500 cursor-help" />
  //     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-700 p-2 rounded text-xs w-48 text-center">
  //       {content}
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-900 to-black text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-500/20 text-purple-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Feature Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Unlock More Power with Pro
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            See what`s included in each plan. Sign up for free and upgrade
            anytime from your dashboard.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Free</h2>
                  <p className="text-zinc-400">Perfect for getting started</p>
                </div>
                <div className="bg-zinc-700 rounded-full px-3 py-1 text-xs font-medium text-white">
                  Limited
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-white">$0</div>
                <div className="text-zinc-400">Forever free</div>
              </div>
              <Link href={"/auth/sign-up"}>
                <button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-3 rounded-lg transition-all mb-8">
                  Try for Free
                </button>
              </Link>

              <div className="space-y-1 mb-6">
                <h3 className="font-medium text-zinc-300 mb-3">
                  Free plan includes:
                </h3>
                <ul className="space-y-1">
                  <PlanFeature
                    icon={<User size={16} className="text-zinc-300" />}
                    text="Personal account"
                  />
                  <PlanFeature
                    icon={<Folder size={16} className="text-zinc-300" />}
                    text="1 workspace"
                  />
                  <PlanFeature
                    icon={<Video size={16} className="text-zinc-300" />}
                    text="Videos up to 5 minutes"
                  />
                  <PlanFeature
                    icon={<FileVideo size={16} className="text-zinc-300" />}
                    text="720p video resolution"
                  />
                  <PlanFeature
                    icon={<Bot size={16} className="text-zinc-300" />}
                    text="5 AI Agent trials"
                  />
                  <PlanFeature
                    icon={<Download size={16} className="text-zinc-300" />}
                    text="3 exports per month"
                  />
                  <PlanFeature
                    icon={<Cloud size={16} className="text-zinc-300" />}
                    text="500 MB storage"
                  />
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-lg border border-purple-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              POPULAR
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">Pro</h2>
                <p className="text-purple-300">For creators who need more</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-white">$99</div>
                  <div className="text-purple-300 ml-1">/ 3 months</div>
                </div>
                <div className="text-purple-300 text-sm">
                  Access all Pro features
                </div>
              </div>
              <Link href={"/auth/sign-in"}>
                <button className="w-full bg-white hover:bg-purple-50 text-purple-900 font-medium py-3 rounded-lg transition-all mb-8">
                  See Details in Dashboard
                </button>
              </Link>

              <div className="space-y-1 mb-6">
                <h3 className="font-medium text-white mb-3">
                  Everything in Free, plus:
                </h3>
                <ul className="space-y-1">
                  <PlanFeature
                    icon={<Users size={16} className="text-purple-300" />}
                    text="Team collaboration (up to 5 members)"
                    isPro
                  />
                  <PlanFeature
                    icon={<Folder size={16} className="text-purple-300" />}
                    text="Unlimited workspaces"
                    isPro
                  />
                  <PlanFeature
                    icon={<Infinity size={16} className="text-purple-300" />}
                    text="Unlimited video length"
                    isPro
                  />
                  <PlanFeature
                    icon={<FileVideo size={16} className="text-purple-300" />}
                    text="1080p video resolution"
                    isPro
                  />
                  <PlanFeature
                    icon={<Bot size={16} className="text-purple-300" />}
                    text="Unlimited AI Agent access"
                    isPro
                  />
                  <PlanFeature
                    icon={<Download size={16} className="text-purple-300" />}
                    text="Unlimited exports"
                    isPro
                  />
                  <PlanFeature
                    icon={<Cloud size={16} className="text-purple-300" />}
                    text="50 GB storage"
                    isPro
                  />
                  <PlanFeature
                    icon={<Shield size={16} className="text-purple-300" />}
                    text="Advanced privacy settings"
                    isPro
                  />
                  <PlanFeature
                    icon={<Star size={16} className="text-purple-300" />}
                    text="Priority support"
                    isPro
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
          <p className="text-zinc-400 mb-6">
            Sign up now and explore all features. Upgrade anytime from your
            dashboard.
          </p>
          <Link href={"/auth/sign-up"}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-all font-medium text-lg">
              Try for Free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
