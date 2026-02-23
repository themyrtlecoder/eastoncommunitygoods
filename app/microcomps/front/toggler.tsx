'use client';

import { useState } from "react";

const useToggle = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    return {toggle, setToggle}
}

export default useToggle;