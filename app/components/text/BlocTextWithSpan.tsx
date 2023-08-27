function BlocTextWithspan({ dogWalk, text }: { dogWalk: boolean | string; text: string }) {

  const handleReturn = () => {
    if (typeof dogWalk === 'string') {
      return dogWalk
    } else {
      return dogWalk ? 'Oui' : 'Non'
    }
  }

  return (
    <p className='mt-4'>
      {text}
      <span className='font-semibold'>{handleReturn()}</span>
    </p>
  );
}

export default BlocTextWithspan;
