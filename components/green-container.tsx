function GreenContainer({ children }: { children: React.ReactNode }) {
    return ( 
        <section className='bg-primary h-auto p-5 rounded-md mt-10'>
            {children}
        </section>
     );
}

export default GreenContainer;