// src/components/tools/ShopifyColorGenerator/types.ts

export interface HorizonSettings {
    // Basic Colors
    background: string;
    foreground_heading: string;
    foreground: string;
    primary: string;
    primary_hover: string;
    border: string;
    shadow: string;

    // Primary Button
    primary_button_background: string;
    primary_button_text: string;
    primary_button_border: string;
    primary_button_hover_background: string;
    primary_button_hover_text: string;
    primary_button_hover_border: string;

    // Secondary Button
    secondary_button_background: string;
    secondary_button_text: string;
    secondary_button_border: string;
    secondary_button_hover_background: string;
    secondary_button_hover_text: string;
    secondary_button_hover_border: string;

    // Inputs
    input_background: string;
    input_text_color: string;
    input_border_color: string;
    input_hover_background: string;

    // Variants (Unselected)
    variant_background_color: string;
    variant_text_color: string;
    variant_border_color: string;
    variant_hover_background_color: string;
    variant_hover_text_color: string;
    variant_hover_border_color: string;

    // Selected Variants
    selected_variant_background_color: string;
    selected_variant_text_color: string;
    selected_variant_border_color: string;
    selected_variant_hover_background_color: string;
    selected_variant_hover_text_color: string;
    selected_variant_hover_border_color: string;
}
