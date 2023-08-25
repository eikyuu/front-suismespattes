function TextWithQuote({content}: {content: string}): JSX.Element {
  return <p className='text-white'>« {content} » </p>;
}

export default TextWithQuote;
