function TextAlert({text}: {text: string}) {
  return (
    <p className='mt-4 text-red-600 uppercase'>
      &#9888; {text}
    </p>
  );
}

export default TextAlert;
