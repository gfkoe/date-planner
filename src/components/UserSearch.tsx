import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
//import { FaSearch } from "react-icons/fa";

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  useEffect(() => {
    //Will need to add fetch for api call here
  }, [searchTerm]);

  return (
    <div>
      <Input type="text" value={searchTerm} placeholder="Search Users" />
    </div>
  );
}
