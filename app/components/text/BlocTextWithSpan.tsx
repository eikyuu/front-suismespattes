function BlocTextWithspan({ dogDestination, text }: { dogDestination: boolean | string; text: string }) {

  const handleReturn = () => {
    if (typeof dogDestination === 'string') {
      return dogDestination
    } else {
      return dogDestination ? 'Oui' : 'Non'
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
