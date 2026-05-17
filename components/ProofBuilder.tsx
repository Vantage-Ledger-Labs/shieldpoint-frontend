import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const DEFAULT_STEPS: Step[] = [
  {
    id: 1,
    title: "Select Asset",
    description: "Choose the asset you want to prove ownership of",
    status: "completed",
  },
  {
    id: 2,
    title: "Create Proof",
    description: "Generate cryptographic proof of ownership",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Verify Proof",
    description: "Verify the proof is valid",
    status: "pending",
  },
  {
    id: 4,
    title: "Submit",
    description: "Submit the proof to the blockchain",
    status: "pending",
  },
];

export default function ProofBuilder() {
  const [steps, setSteps] = useState<Step[]>(DEFAULT_STEPS);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const getStatusColor = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "→";
      case "pending":
        return "◯";
    }
  };

  const handleStepClick = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Proof Builder</h2>
      <p className="text-gray-600 mb-8">Follow these steps to create and submit your proof</p>

      {/* Desktop View - Horizontal Steps */}
      <div className="hidden md:block mb-8">
        <div className="grid grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition ${getStatusColor(
                  step.status
                )} cursor-pointer hover:shadow-lg`}
                onClick={() => handleStepClick(step.id)}
              >
                {getStatusIcon(step.status)}
              </div>

              {/* Step Title */}
              <h3 className="mt-3 font-semibold text-gray-900 text-center text-sm">
                {step.title}
              </h3>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute w-full h-0.5 bg-gray-300 top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View - Vertical Steps */}
      <div className="md:hidden space-y-4 mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="border-2 border-gray-200 rounded-lg overflow-hidden transition hover:shadow-md"
          >
            {/* Step Header - Mobile */}
            <button
              onClick={() => handleStepClick(step.id)}
              className={`w-full p-4 flex items-center justify-between ${getStatusColor(
                step.status
              )} bg-opacity-30`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${getStatusColor(
                    step.status
                  )}`}
                >
                  {getStatusIcon(step.status)}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <svg
                className={`w-5 h-5 text-gray-600 transition ${
                  expandedStep === step.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Step Content - Mobile */}
            {expandedStep === step.id && (
              <div className="p-4 bg-white border-t-2 border-gray-200">
                <p className="text-gray-700 mb-4">{step.description}</p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                  {step.status === "completed"
                    ? "Completed"
                    : step.status === "in-progress"
                    ? "Continue"
                    : "Start"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Details Panel */}
      {expandedStep && (
        <div className="hidden md:block bg-white border-2 border-gray-200 rounded-lg p-6">
          {steps.map((step) => {
            if (step.id !== expandedStep) return null;
            return (
              <div key={step.id}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {step.description}
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                  {step.status === "completed"
                    ? "Completed"
                    : step.status === "in-progress"
                    ? "Continue"
                    : "Start"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition font-medium">
          Save Draft
        </button>
        <button className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium">
          Submit Proof
        </button>
      </div>
    </div>
  );
}
