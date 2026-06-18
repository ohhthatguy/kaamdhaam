"use client";
import { useState } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Form2 = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  interface SkillOption {
    value: string;
    label: string;
  }

  const options: SkillOption[] = [
    // --- Home Care & Maintenance ---
    { value: "gardening", label: "Gardening & Landscaping" },
    { value: "electrical", label: "Electrical Work" },
    { value: "plumbing", label: "Plumbing Repair" },
    { value: "carpentry", label: "Carpentry & Woodworking" },
    { value: "house_cleaning", label: "House Cleaning & Deep Cleaning" },
    { value: "appliance_repair", label: "Appliance Repair" },
    { value: "painting", label: "Home Painting & Wall Art" },

    // --- Digital & Creative Arts ---
    { value: "videography", label: "Videography & Video Editing" },
    { value: "photography", label: "Event & Product Photography" },
    { value: "music_production", label: "Music Making & Audio Mixing" },
    { value: "graphic_design", label: "Graphic Design & Branding" },
    { value: "content_writing", label: "Content Writing & Copywriting" },
    { value: "social_media", label: "Social Media Management" },

    // --- Technical & Professional ---
    { value: "web_development", label: "Web & App Development" },
    { value: "computer_repair", label: "PC Repair & IT Support" },
    { value: "accounting", label: "Bookkeeping & Tax Filing" },
    { value: "translation", label: "Language Translation" },

    // --- Education & Wellness ---
    {
      value: "academic_tutoring",
      label: "Academic Tutoring (Math, Science, etc.)",
    },
    { value: "music_lessons", label: "Music Lessons (Guitar, Piano, Vocals)" },
    { value: "language_teaching", label: "Language Teaching" },
    { value: "fitness_training", label: "Fitness & Yoga Training" },
    { value: "cooking_baking", label: "Cooking & Baking Lessons" },

    // --- Logistics & Events ---
    { value: "delivery_errands", label: "Local Delivery & Errands" },
    { value: "makeup_styling", label: "Makeup Artistry & Hair Styling" },
    { value: "event_planning", label: "Event Planning & Decoration" },
    { value: "tailoring_sewing", label: "Tailoring & Clothes Alteration" },
    { value: "pet_sitting", label: "Pet Sitting & Dog Walking" },
  ];

  const [selectedOption, setSelectedOption] = useState<MultiValue<SkillOption>>(
    [],
  );

  console.log(selectedOption);

  return (
    <div className="flex flex-col gap-4  h-96 overflow-auto  scrollbar-custom ">
      <fieldset className="grid gap-2">
        <label htmlFor="name">Skills</label>
        <Select
          instanceId="kaamdhaam-skill-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e)}
          options={options}
          isMulti
          closeMenuOnSelect={false}
          components={animatedComponents}
        />
      </fieldset>

      <fieldset className="grid gap-2">
        <label htmlFor="bio">Bio</label>
        <textarea
          rows={7}
          name="bio"
          className="border rounded-md p-2 text-md"
          placeholder="Tell us about yourself"
        />
      </fieldset>

      <div>
        <button
          className="border w-fit px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setActiveStep(3)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form2;
