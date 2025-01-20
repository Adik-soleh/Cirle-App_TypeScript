import { UserType } from "@/types/types";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLeftArrowAlt, BiSearchAlt } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import MainBar from "@/components/bars/MainBar";
import IconInput from "@/components/inputs/IconInput";
import NavigationHeading from "@/components/leftPannel/NavigationHeading";
import AccountCard from "@/components/rightPanel/AccountCard";
import CircleSpinner from "@/components/utils/CircleSpinner";
import EmptyMessage from "@/components/utils/EmptyMessage";
import API from "@/connect/api";

function SearchPage() {
  const { register, watch } = useForm();

  const [searchResult, setSearchResult] = useState<UserType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const debounced = useDebouncedCallback(async (searchKeyword) => {
    try {
      const searchResult = await API.FIND_USERS(searchKeyword);
      setSearchResult(searchResult);
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, 500);

  watch((data) => {
    setLoading(true);
    setSearchResult([]);
    setSearchKeyword(data.search);

    debounced(data.search);
  });

  if (!searchKeyword) {
    return (
      <MainBar>
        <Link to={"/"}>
          <NavigationHeading icon={<BiLeftArrowAlt />} text={"Search"} sticky />
        </Link>
        <IconInput
          type={"text"}
          placeholder={"search"}
          icon={<MdPersonSearch />}
          name={"search"}
          register={register}
        />
        <EmptyMessage
          header={"want to find someone?"}
          body={"Have a nice day!!."}
        />
      </MainBar>
    );
  }

  return (
    <MainBar>
      <Link to={"/"}>
        <NavigationHeading icon={<BiLeftArrowAlt />} text={"Search"} sticky />
      </Link>
      <IconInput
        type={"text"}
        placeholder={"search"}
        icon={<BiSearchAlt />}
        name={"search"}
        register={register}
      />
      <Flex direction={"column"} gap={"1rem"} px={"1rem"} mt={"1rem"}>
        {searchResult.length ? (
          searchResult.map((result) => (
            <AccountCard
              key={result.id}
              id={result.id}
              name={result.name}
              username={result.username}
              avatar={result.avatar}
              bio={result.bio}
              isFollowed={result.isFollowed}
            />
          ))
        ) : isLoading ? (
          <Box mt={"2rem"}>
            <CircleSpinner />
          </Box>
        ) : (
          <EmptyMessage
            header={`No result for "${searchKeyword}".`}
            body={
              "Try searching for something else or check the spelling of wjat you typed"
            }
          />
        )}
      </Flex>
    </MainBar>
  );
}

export default SearchPage;
