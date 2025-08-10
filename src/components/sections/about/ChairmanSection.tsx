// components/ChairmanSection.tsx
import { chairmanData } from '@/data/about-us/data';
import LeadershipSection from './LeadershipSection';

const ChairmanSection = () => {
  return (
    <LeadershipSection
      title="Message from Chairman"
      name={chairmanData.name}
      jobTitle={chairmanData.title}
      content={chairmanData.content}
      imageSrc={chairmanData.image}
      imageAlt={`${chairmanData.name} - ${chairmanData.title}`}
      imagePosition="left"
      backgroundColor="bg-gray-50"
    />
  );
};

export default ChairmanSection;