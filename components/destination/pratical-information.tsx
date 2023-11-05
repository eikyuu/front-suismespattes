import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Text from "../ui/text/Text"

interface PraticalInformationProps {
  street: string
  city: {
    label: string
    postalCode: string
  }
  latitude: string
  longitude: string
}

export default function PraticalInformation({
  street,
  city,
  latitude,
  longitude,
}: PraticalInformationProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>INFORMATIONS PRATIQUES</AccordionTrigger>
        <AccordionContent className="text-md">
          <div>
            <Text>
              Adresse :&nbsp;{" "}
              <span className="font-bold">
                {street}, {city.postalCode}, {city.label}
              </span>
            </Text>
          </div>
          <div className="flex flex-row">
            <Text>Coordonnées GPS :&nbsp; </Text>
            <Text type="bold">{latitude}</Text>
            <Text>,</Text>
            <Text type="bold">{longitude}</Text>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
