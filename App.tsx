import { Button, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function App() {
  const intensity = useSharedValue(1);
  const opacity = useDerivedValue(() => {
    return intensity.value / 100.0;
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder="#eee"
        contentFit="cover"
        transition={1000}
      />
      <AnimatedBlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={intensity}
        style={[StyleSheet.absoluteFill]}
        // Other style properties will update correctly
        // style={[StyleSheet.absoluteFill, { opacity, backgroundColor: 'red' }]}
      />
      <Animated.View
        style={{
          width: intensity,
          opacity,
          height: 100,
          backgroundColor: "violet",
          position: "absolute",
          top: 300,
        }}
      />

      <Slider
        style={{ width: "80%", position: "absolute", bottom: 100 }}
        value={intensity.value}
        step={1}
        minimumValue={1}
        maximumValue={100}
        onValueChange={(value) => {
          intensity.value = value;
        }}
      />

      <View style={{ position: "absolute", top: 100, bottom: 0 }}>
        <Button
          title="Animate"
          onPress={() => (intensity.value = Math.random() * 100)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
