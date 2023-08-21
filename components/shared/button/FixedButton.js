"use client";
import React, { useState } from "react";

import Button from "./Button";

// import useDetectKeyboardOpen from "use-detect-keyboard-open";

import { useRouter } from "next/navigation";
function FixedButton({ title, onClick, rules, timer, borderTop, loading, disable, ruleClick }) {
  const router = useRouter();
  // const isKeyboardOpen = useDetectKeyboardOpen();

  // useEffect(() => {
  //   rules && visibleTermsModal && !termsContent && getTerms();
  // }, [visibleTermsModal]);

  // const getTerms = () => {
  //   ApiCall(
  //     "GET",
  //     apiRoutes.BASE_CONTENT("terms"),
  //     null,
  //     "terms",
  //     ({ data }) => {
  //       if (!data || isEmpty(data.content)) return;
  //       const safeHTMLFullText = DOMPurify.sanitize(data.content[0]?.full_text);
  //       const safeHTMLSmallText = DOMPurify.sanitize(data.content[0]?.small_text);
  //       setTermsContent({
  //         fullText: safeHTMLFullText,
  //         smallText: safeHTMLSmallText,
  //       });
  //       setTermsLoading(false);
  //     },
  //     null,
  //     ONE_HOUR_CACHE_DURATION
  //   );
  // };

  return (
    <>
      {/* {!isKeyboardOpen ? ( */}
      <div
        className={`fixed-button-main bg-white  dark:bg-zinc-700  mt-8  ${borderTop && "border-t border-r border-l"}`}
      >
        {timer && timer()}
        <Button
          loading={loading}
          title={title}
          disabled={disable}
          onClick={
            onClick
            // router.push(`/auth/login?mobile_number=${mobile}`)
          }
          width="w-full !text-sm"
          containerClass=" mx-auto  w-full mb-4"
          roundedClass={"rounded-full"}
        />
      </div>
      {/* ) : (
        <></>
      )} */}
    </>
  );
}

export default FixedButton;
