import { Fragment } from "react";

export default function SectionHeaders({subHeader,mainHeader}) {
	return (
	  <Fragment>
		<h3 className="uppercase text-gray-500 font-semibold leading-4">
		  {subHeader}
		</h3>
		<h2 className="text-primary font-bold text-4xl italic">
		  {mainHeader}
		</h2>
	  </Fragment>
	);
  }