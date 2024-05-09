import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Main from "./layout/Main";
import JobPages from "./pages/JobPages";
import NotFound from "./pages/NotFound";
import Jobpage, { jobLoader } from "./pages/Jobpage";
import AddJobs from "./pages/AddJobs";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  //ADDJOBS
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };
  //DELETE jobs

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<JobPages />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<Jobpage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="add-job" element={<AddJobs addJobSubmit={addJob} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
