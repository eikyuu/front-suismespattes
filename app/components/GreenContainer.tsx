function GreenContainer({ children }: { children: React.ReactNode }) {
    return ( 
        <section className='bg-primary h-auto p-10 rounded-lg mt-10'>
            {children}
        </section>
     );
}

export default GreenContainer;