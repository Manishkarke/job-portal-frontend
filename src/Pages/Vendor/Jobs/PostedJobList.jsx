import React from "react";
import { Banner } from "../../../Components/Banner";
import { Button } from "../../../Components/Button";

export const PostedJobList = () => {
  return (
    <>
      <Banner
        moto="where jobs meet talent"
        buttonText="post jobs"
        buttonLink="/vendor/createJobs"
      />
      <section className="py-4">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-xl capitalize font-bold">my jobs</h2>
          <Button customization="w-fit" navigateTo="/vendor/createJobs">
            create jobs
          </Button>
        </div>

        {/* Job cards */}
      </section>
    </>
  );
};
