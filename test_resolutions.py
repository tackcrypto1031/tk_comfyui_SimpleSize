from nodes import TK_SimpleSize

def test_resolutions():
    node = TK_SimpleSize()
    
    # Test cases: Now we pass (model, ratio, resolution)
    # The backend mostly cares about 'resolution', but we pass ratio for completeness of signature
    test_inputs = [
        ("SD1.5", "1:1", "512x512"),
        ("SDXL", "1:1", "1024x1024"),
        ("WAN", "3:4", "416x544"),
        ("WAN", "16:9", "624x368"), # Auto-generated inverted 9:16 case test
        ("WAN", "16:9", "1280x720"), # Standard case
    ]

    print(f"{'Model':<12} {'Ratio':<10} {'Resolution':<15} {'Result':<12}")
    print("-" * 60)

    for model, ratio, res in test_inputs:
        width, height = node.get_size(model, ratio, res)
        print(f"{model:<12} {ratio:<10} {res:<15} {width}x{height}")

if __name__ == "__main__":
    test_resolutions()
