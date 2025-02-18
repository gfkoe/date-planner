import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
//import { FaSearch } from "react-icons/fa";

export default function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const [foundUsers, setFoundUsers] = useState([]);
  useEffect(() => {
    //Will need to add fetch for api call here
  }, [searchTerm]);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }

  return (
    <div>
      <Input
        type="text"
        value={searchTerm}
        placeholder="Search Users"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
