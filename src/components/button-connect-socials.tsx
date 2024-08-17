import { motion } from "framer-motion";
import X from "@/components/icons/x";
import Google from "@/components/icons/google";
import GitHub from "@/components/icons/github";
import { ButtonModal } from "@/components/button-modal";

const ButtonConnectSocials = () => {
  const iconVariants = {
    animate: {
      y: [38, 38, 0, 0, -38, -38, 0, 0, 38],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <ButtonModal
      variant="outline"
      screen="ConnectSocials"
      className="relative overflow-hidden flex items-center gap-3"
    >
      <motion.div
        className="flex flex-col justify-start gap-4"
        variants={iconVariants}
        animate="animate"
      >
        <Google width={24} height={24} />
        <X width={20} height={20} />
        <GitHub width={24} height={24} />
      </motion.div>
      <span>Sign in with socials</span>
    </ButtonModal>
  );
};

export default ButtonConnectSocials;
