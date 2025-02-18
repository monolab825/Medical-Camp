import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

const fetchCamps = async () => {
  const { data } = await axios.get("https://medicamp-eight.vercel.app/addCampData");
  return data;
};

const PopularCamps = () => {
  const {
    data: camps,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: fetchCamps,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading camps</div>;

  // Sort the camps by participantCount in descending order and take the top 6
  const sortedCamps = camps.sort((a, b) => b.participantCount - a.participantCount).slice(0, 6);

  return (
    <div>
      <h1 className="text-center text-purple-600 font-bold text-4xl my-10">
        Popular Camps
      </h1>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {sortedCamps.map((camp) => (
          <div key={camp._id}>
            <div className="card w-96 glass bg-slate-100">
              <figure>
                <img src={camp.image} alt="Camp!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{camp.name}</h2>
                <p><span className="font-bold">Fees:</span> ${camp.fees}</p>
                <p><span className="font-bold">Date & Time: </span>{camp.dateTime}</p>
                <p><span className="font-bold">Location:</span> {camp.location}</p>
                <p><span className="font-bold">Healthcare Professional:</span> {camp.healthcareProfessional}</p>
                <p><span className="font-bold">Participant Count:</span> {camp.participantCount}</p>

                <div className="card-actions justify-end">
                 <Link to={`/popularDetails/${camp._id}`}> <button className="btn btn-primary">Details</button></Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center my-8">
      <Link to="/available-camps"> <button className="btn btn-primary">See More</button></Link>
      </div>
                
    </div>
  );
};

export default PopularCamps;
