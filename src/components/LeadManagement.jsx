import { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";

const LeadManagement = () => {
  const { detailId } = useParams();
  // console.log(detailId);
  const [eachData, setEachData] = useState([]);
  const [comment, setComment] = useState([]);
  const [addComment, setAddComment] = useState({
    author: "",
    commentText: "",
  });
  const [updateLeadSuccessMessage, setUpdateLeadSuccessMessage] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    name: "",
    agent: "",
    source: "",
    status: "",
    priority: "",
    timeToClose: "",
  });

  useEffect(() => {
    if (eachData.salesAgent?._id) {
      setAddComment((prev) => ({
        ...prev,
        author: eachData.salesAgent._id,
      }));
    }

    if (eachData?._id) {
      setEditDetails({
        name: eachData.name || "",
        source: eachData.source || "",
        status: eachData.status || "",
        priority: eachData.priority || "",
        timeToClose: eachData.timeToClose || 1,
      });
    }
  }, [eachData]);

  const editLeadDetail = async () => {
    try {
      const res = await fetch(`http://localhost:3000/leads/${detailId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editDetails),
      });
      if (!res.ok) {
        console.log("Failed to update the lead");
        return;
      }
      await fetchEachLead();
      setUpdateLeadSuccessMessage(true);
      setTimeout(() => {
        setUpdateLeadSuccessMessage(false);
      }, 2000);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const sendNewComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/leads/${detailId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addComment),
        }
      );
      if (!res.ok) {
        console.log("Unable to send the comment");
        return;
      }
      await res.json();
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
      setAddComment({ commentText: "" });
      await fetchCommentLead();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentLead = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/leads/${detailId}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        console.log("Failed to fetch comment data");
        return;
      }
      const data = await res.json();
      // console.log(data);
      setComment(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEachLead = async () => {
    try {
      const res = await fetch(`http://localhost:3000/lead/${detailId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("Failed to get the data by id");
        return;
      }
      const data = await res.json();
      setEachData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const lead = {
    name: eachData.name,
    agent: eachData.salesAgent?.name,
    source: eachData.source,
    status: eachData.status,
    priority: eachData.priority,
    timeToClose: eachData.timeToClose,
  };

  useEffect(() => {
    fetchEachLead();
    fetchCommentLead();
  }, [detailId]);

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <div className="w-full md:w-64 bg-gray-900 text-white p-4 md:p-6 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Lead Management</h2>
        <ul className="menu text-base md:text-lg space-y-2">
          <Link to={"/"}>
            <li className="hover:bg-gray-800 p-2 rounded">
              ← Back to <br className="hidden md:block" /> Dashboard
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Lead Management: {lead.name}
        </h1>

        <h2 className="text-xl md:text-2xl font-bold mb-4">Lead Details</h2>

        <div className="card bg-white shadow-md p-4 md:p-6 rounded-xl mb-8 md:mb-10 max-w-full md:max-w-2xl">
          {!isEditing ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <p className="text-gray-700">
                    <strong>Lead Name:</strong> {lead.name}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Sales Agent:</strong> {lead.agent}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Lead Source:</strong> {lead.source}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Lead Status:</strong> {lead.status}
                  </p>
                </div>

                <div>
                  <p className="text-gray-700">
                    <strong>Priority:</strong>
                  </p>
                  <p className="font-semibold text-gray-900">{lead.priority}</p>

                  <p className="text-gray-700 mt-4">
                    <strong>Time to Close:</strong>
                  </p>
                  <p className="font-semibold text-gray-900">
                    {lead.timeToClose}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-center text-lg md:text-xl mb-2 font-semibold">
                Edit Your Lead details
              </h3>
              <input
                className="input input-bordered w-full mb-2"
                value={editDetails.name}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, name: e.target.value })
                }
              />

              <select
                className="select select-bordered w-full mb-2"
                value={editDetails.status}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, status: e.target.value })
                }
              >
                <option value="">Change status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                className="select select-bordered w-full mb-2"
                value={editDetails.priority}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, priority: e.target.value })
                }
              >
                <option value="">Change Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <input
                className="input input-bordered w-full mb-2"
                value={editDetails.timeToClose}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    timeToClose: Number(e.target.value),
                  })
                }
              />
            </>
          )}
          {updateLeadSuccessMessage && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-info">
                <span>Lead Updated successfully.</span>
              </div>
            </div>
          )}
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                className="btn btn-secondary text-white w-full sm:w-auto"
                onClick={editLeadDetail}
              >
                Save
              </button>

              <button
                className="btn btn-outline w-full sm:w-auto"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary px-6 text-white mt-4 w-full sm:w-auto"
              onClick={() => {
                setEditDetails({
                  name: eachData.name || "",
                  source: eachData.source || "",
                  status: eachData.status || "",
                  priority: eachData.priority || "",
                  timeToClose: eachData.timeToClose || 1,
                });
                setIsEditing(true);
              }}
            >
              Edit Lead Details
            </button>
          )}
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4 max-w-full md:max-w-2xl">
          {comment.map((eachComment, index) => (
            <div key={index} className="card bg-white shadow-md p-4 rounded-xl">
              <p className="font-semibold text-sm md:text-base">
                {eachComment?.author} - {eachComment?.createdAt?.split("T")[0]}
              </p>
              <p className="text-gray-700 mt-1 text-sm md:text-base">
                Comment: {eachComment.commentText}
              </p>
            </div>
          ))}
        </div>

        <div className="card bg-white shadow-md p-4 rounded-xl mt-6 max-w-full md:max-w-2xl">
          <form onSubmit={sendNewComment}>
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Add New Comment"
              value={addComment.commentText}
              onChange={(e) =>
                setAddComment({ ...addComment, commentText: e.target.value })
              }
            ></textarea>

            <button className="btn btn-primary px-6 text-white w-full sm:w-auto">
              Submit Comment
            </button>
          </form>
        </div>
        {successMessage && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Comment Added successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadManagement;
