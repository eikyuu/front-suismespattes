function BlocTextWithspan({ dogWalk, text} : { dogWalk: any, text: string }) {
    return ( 
        <p className='mt-4'>
        {text}
        <span className='font-semibold'>
          {dogWalk ? ' Oui' : ' Non'}
        </span>
      </p>
     );
}

export default BlocTextWithspan;