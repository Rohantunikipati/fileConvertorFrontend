import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

const About = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Brife</Button>
      </SheetTrigger>
      <SheetContent >
        <SheetHeader>
          <SheetTitle>About this site</SheetTitle>
          <SheetDescription className="text-lg">
            <p>
              {" "}
              This site included features for uploading image files, converting
              them to different formats efficiently.
            </p>
            <ul className=" list-disc  px-10 text-xl mt-3 font-semibold font-mono">
              <li>React.js</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>FFmpeg</li>
              <li>Multer</li>
            </ul>
          </SheetDescription>
        </SheetHeader>
        <SheetHeader className="mt-10">
          <SheetTitle>Upcoming Updates:</SheetTitle>
          <SheetDescription className="text-lg">
            <ul className=" list-disc  pl-6  mt-3 font-semibold font-mono">
              <li>Handel muiltiple images</li>
              <li>Support for image Compression</li>
              <li>Support for Video Conversion</li>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default About;
