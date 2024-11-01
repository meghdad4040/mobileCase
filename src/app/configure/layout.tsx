import Steps from "@/components/Steps";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<MaxWidthWrapper className=' flex flex-1 flex-col'>
			<Steps />
			{children}
		</MaxWidthWrapper>
	);
};

export default Layout;
