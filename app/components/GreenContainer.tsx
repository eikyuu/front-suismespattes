function GreenContainer({ children }: { children: React.ReactNode }) {
    return ( 
        <div className='bg-primary h-auto p-10 rounded-lg mt-10'>
            {children}
        </div>
     );
}

export default GreenContainer;