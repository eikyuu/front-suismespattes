import Image from 'next/image';
 import banner from '../../../public/images/banner.jpg';
 import TextWithQuote from '../../atoms/textWithQuote/textWithQuote';
 import BoldText from '../../atoms/textBold/textBold';
 interface ReviewProps {
   name: string;
   content: string;
 }
 function Review({ name, content }: ReviewProps): JSX.Element {
   return (
     <div className="flex items-center">
       <Image
         className="w-48 h-48 rounded-full object-cover border-8 border-white"
         src={banner}
         alt="Profile picture of {name}"
         placeholder="blur"
         quality={100}
       />
       <div className="pl-4">
         <BoldText text={name} />
         <TextWithQuote content={content} />
       </div>
     </div>
   );
 }
 export default Review;