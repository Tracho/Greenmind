function SVGminus({clas} : {clas?:string}) {
  return (<>
    <svg xmlns="http://www.w3.org/2000/svg" className={clas || undefined} viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 256H112" /></svg>
  </>);
}

export default SVGminus;