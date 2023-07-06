"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seed = {
    addresses: [
        {
            address: '123 5th St.',
            city: 'Los Angeles',
            state: 'CA',
            postal_code: '90909',
        },
        {
            address: '456 11th St.',
            city: 'Long Beach',
            state: 'CA',
            postal_code: '90808',
        },
        {
            name: 'Markit',
            address: '2430 Turner Ave NW',
            city: 'Grand Rapids',
            state: 'MI',
            postal_code: '49544',
        },
    ],
    bills: [
        {
            quickbooks_bill_id: 1,
            status_id: 1,
            terms: 'Net 30',
        },
    ],
    purchaseOrdersBills: [
        {
            bill_id: 1,
            purchase_order_id: 1,
        },
    ],
    vendors: [
        {
            name: 'SanMar',
            address_id: 1,
            remit_address_id: 1,
            shipping_address_id: 1,
            phone_number: '555-555-5555',
            website_url: 'sanmar.com',
            is_supplier: true,
            terms: 'Net 30',
        },
        {
            name: 'S&S',
            address_id: 2,
            remit_address_id: 2,
            shipping_address_id: 2,
            phone_number: '555-555-1234',
            website_url: 'sands.com',
            is_supplier: true,
            terms: 'Net 30',
        },
    ],
    vendorContacts: [
        {
            vendor_id: 1,
            first_name: 'John',
            last_name: 'Smith',
            email: 's@s.com',
        },
    ],
    productBrands: [
        {
            name: 'Gildan',
        },
        {
            name: 'SPORT-TEK',
        },
        {
            name: 'Port & Company®',
        },
    ],
    productStyles: [
        {
            product_brand_id: 1,
            style_name: '2000',
            description: 'The classic T-shirt',
        },
        {
            product_brand_id: 2,
            style_name: 'Pullover Jacket ST855',
            vendor_description: 'Sport-Tek® Sport-Wick® Stretch Reflective Heather 1/2-Zip Pullover Jacket ST855',
        },
        {
            product_brand_id: 3,
            style_name: '50/50 Cotton/ Poly T-Shirt',
            vendor_description: 'PC55P ATHLETIC HEATHER Port & Company® 50/50 Cotton/ Poly T-Shirt with Pocket',
        },
    ],
    sizes: [
        {
            name: 'Small',
            symbol: 'S',
        },
        {
            name: 'Medium',
            symbol: 'M',
        },
        {
            name: 'Large',
            symbol: 'L',
        },
    ],
    colors: [
        {
            name: 'Red',
        },
        {
            name: 'Green',
        },
        {
            name: 'Blue',
        },
        {
            name: 'Charcoal Gray',
        },
        {
            name: 'Athletic Heather Gray',
        },
    ],
    products: [
        {
            product_style_id: 1,
            size_id: 1,
            color_id: 1,
        },
        {
            product_style_id: 1,
            size_id: 1,
            color_id: 2,
        },
        {
            product_style_id: 1,
            size_id: 1,
            color_id: 3,
        },
        {
            product_style_id: 1,
            size_id: 2,
            color_id: 1,
        },
        {
            product_style_id: 1,
            size_id: 2,
            color_id: 2,
        },
        {
            product_style_id: 1,
            size_id: 2,
            color_id: 3,
        },
        {
            product_style_id: 1,
            size_id: 3,
            color_id: 1,
        },
        {
            product_style_id: 1,
            size_id: 3,
            color_id: 2,
        },
        {
            product_style_id: 1,
            size_id: 3,
            color_id: 3,
        },
        {
            product_style_id: 1,
            color_id: 2,
        },
        {
            product_style_id: 1,
            color_id: 3,
        },
        {
            product_style_id: 2,
            size_id: 1,
            color_id: 4,
        },
        {
            product_style_id: 2,
            size_id: 2,
            color_id: 4,
        },
        {
            product_style_id: 2,
            size_id: 3,
            color_id: 4,
        },
        {
            product_style_id: 3,
            size_id: 1,
            color_id: 5,
        },
        {
            product_style_id: 3,
            size_id: 2,
            color_id: 5,
        },
        {
            product_style_id: 3,
            size_id: 3,
            color_id: 5,
        },
    ],
    vendorsProducts: [
        {
            vendor_id: 1,
            product_id: 1,
            sku: '1234444',
            price: 14,
        },
        {
            vendor_id: 1,
            product_id: 2,
            sku: '41343252',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 3,
            sku: '543523',
            price: 2.99,
        },
        {
            vendor_id: 1,
            product_id: 4,
            sku: '12456423',
            price: 5,
        },
        {
            vendor_id: 1,
            product_id: 5,
            sku: '224352345',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 6,
            sku: '235345',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 7,
            sku: '7826754',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 8,
            sku: '1234637345',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 9,
            sku: '7274547',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 10,
            sku: '1346734545',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 11,
            sku: '324456',
            price: 9.99,
        },
        {
            vendor_id: 1,
            product_id: 12,
            sku: 'f23443',
            price: 9.99,
            stock: 234,
        },
        {
            vendor_id: 1,
            product_id: 13,
            sku: 'f23477',
            price: 9.99,
            stock: 115,
        },
        {
            vendor_id: 1,
            product_id: 14,
            sku: 'f23926',
            price: 9.99,
            stock: 734,
        },
    ],
    customers: [
        {
            // id: 1,
            name: 'Moore Electric',
            address_id: 1,
            billing_address_id: 1,
            shipping_address_id: 1,
            phone_number: '555-555-5555',
            email: 'test@markit.com',
            logo: '/images/inaudible.png',
            store_manager_name: 'moore',
            store_manager_url_name: 'moore',
        },
    ],
    customerLocations: [
        {
            customer_id: 1,
            name: 'HQ',
            address_id: 1,
            billing_address_id: 1,
            shipping_address_id: 1,
            phone_number: '555-555-5555',
            email: 'test@markit.com',
            is_headquarters: true,
        },
    ],
    customerContacts: [
        {
            customer_location_id: 1,
            first_name: 'Bob',
            last_name: 'Smith',
            phone_number: '555-555-5555',
            email: 'test@markit.com',
            is_default: true,
        },
    ],
    programs: [
        {
            customer_id: 1,
            name: 'Moore Electric',
            shop_url: 'http://localhost/inaudible-fresh',
            opencart_api_username: 'Default',
        },
    ],
    itemMasters: [
        {
            shop_product_id: 50,
            product_style_id: 1,
            decorator_id: 2,
            supplier_id: 1,
            program_id: 1,
        },
        {
            shop_product_id: 51,
            product_style_id: 2,
            decorator_id: 2,
            supplier_id: 1,
            program_id: 1,
        },
        {
            shop_product_id: 52,
            product_style_id: 3,
            decorator_id: 2,
            supplier_id: 1,
            program_id: 1,
        },
    ],
    designs: [
        {
            default_vendor_id: 2,
            name: 'LOGO',
            location: 'Front left chest',
            image_file: '/images/inaudible.png',
            type: 'Embroidery',
        },
        {
            default_vendor_id: 2,
            name: '1056 CONTROL SOLUTIONS',
            location: 'Left Chest',
            design_size: 'STD',
            image_file: '/images/controlSolutions.png',
            type: 'Embroidery',
            minimum_batch_quantity: 10,
        },
        {
            default_vendor_id: 2,
            name: 'CONTROL SOLUTIONS LEFT CHEST',
            location: 'Left Chest',
            design_size: 'STD',
            image_file: '/images/controlSolutions.png',
            type: 'Transfer Print',
            minimum_batch_quantity: 1,
        },
        {
            default_vendor_id: 2,
            name: 'CONTROL SOLUTIONS FULL BACK',
            location: 'Full Back',
            design_size: 'STD',
            image_file: '/images/controlSolutions.png',
            type: 'Transfer Print',
        },
    ],
    vendorsDesigns: [
        {
            vendor_id: 2,
            design_id: 1,
            pricing: 2.5,
        },
        {
            vendor_id: 2,
            design_id: 2,
            pricing: 2.5,
        },
        {
            vendor_id: 2,
            design_id: 3,
            pricing: 2.5,
        },
        {
            vendor_id: 2,
            design_id: 4,
            pricing: 2.5,
        },
    ],
    itemMastersDesignsColors: [
        {
            item_master_id: 1,
            design_id: 1,
            color_id: 2,
        },
        {
            item_master_id: 1,
            design_id: 1,
        },
        {
            item_master_id: 2,
            design_id: 2,
        },
        {
            item_master_id: 3,
            design_id: 3,
        },
        {
            item_master_id: 3,
            design_id: 4,
        },
    ],
    itemMastersProducts: [
        {
            item_master_id: 1,
            product_id: 1,
        },
        {
            item_master_id: 1,
            product_id: 2,
        },
        {
            item_master_id: 1,
            product_id: 3,
        },
        {
            item_master_id: 1,
            product_id: 4,
        },
        {
            item_master_id: 1,
            product_id: 5,
        },
        {
            item_master_id: 1,
            product_id: 6,
        },
        {
            item_master_id: 1,
            product_id: 7,
        },
        {
            item_master_id: 1,
            product_id: 8,
        },
        {
            item_master_id: 1,
            product_id: 9,
        },
        {
            item_master_id: 1,
            product_id: 10,
        },
        {
            item_master_id: 1,
            product_id: 11,
        },
        {
            item_master_id: 2,
            product_id: 12,
        },
        {
            item_master_id: 2,
            product_id: 13,
        },
        {
            item_master_id: 2,
            product_id: 14,
        },
        {
            item_master_id: 3,
            product_id: 15,
        },
        {
            item_master_id: 3,
            product_id: 16,
        },
        {
            item_master_id: 3,
            product_id: 17,
        },
    ],
    salesOrders: [
        {
            shopOrderId: 40,
            prepayAmount: 0,
            jobId: 1,
            customer_po: '12341434-2343',
        },
    ],
    jobs: [
        {
            statusId: 1,
            program_id: 1,
        },
    ],
    statuses: [
        {
            name: 'New',
        },
        {
            name: 'Pending Client Approval',
        },
        {
            name: 'Client Change Requested',
        },
        {
            name: 'Client Approved',
        },
        {
            name: 'In Production',
        },
        {
            name: 'Shipped',
        },
        {
            name: 'Ready To Be Invoiced',
        },
        {
            name: 'Invoiced',
        },
        {
            name: 'Closed',
        },
    ],
    purchaseOrders: [
        {
            vendor_id: 2,
            status_id: 1,
            in_hands_date: '2020-06-02 12:34:40.005-07',
            shipping_date: '2020-05-26 12:34:40.005-07',
            shipping_method: 'FEDEX',
            shipping_address_name: 'Mark It Merchandise',
            shipping_address: '2430 Turner Ave NW',
            shipping_city: 'Grand Rapids',
            shipping_state: 'MI',
            shipping_postal_code: '49544',
            is_decoration: true,
            created_at: '2020-05-19 21:56:34.083-07',
        },
        {
            vendor_id: 1,
            status_id: 1,
            shipping_date: '2020-05-12 12:34:40.006-07',
            shipping_method: 'FEDEX',
            shipping_address: '123 5th St.',
            shipping_city: 'Los Angeles',
            shipping_state: 'CA',
            shipping_postal_code: '90909',
            to_decorator_id: 2,
            created_at: '2020-05-19 21:56:34.083-07',
        },
    ],
    poLineItems: [
        {
            purchase_order_id: 1,
            item_master_id: 2,
            product_id: 13,
            status_id: 1,
            quantity: 3,
            price: 9.99,
            color_id: 4,
            size_id: 2,
            color: 'Charcoal Gray',
            size: 'Medium',
        },
        {
            purchase_order_id: 1,
            item_master_id: 3,
            product_id: 17,
            status_id: 1,
            quantity: 6,
            price: 8.99,
            color_id: 5,
            size_id: 3,
            color: 'Athletic Heather Gray',
            size: 'Large',
        },
        {
            purchase_order_id: 2,
            item_master_id: 2,
            product_id: 13,
            status_id: 1,
            quantity: 3,
            price: 9.99,
            color_id: 4,
            size_id: 2,
            color: 'Charcoal Gray',
            size: 'Medium',
        },
        {
            purchase_order_id: 2,
            item_master_id: 3,
            product_id: 17,
            status_id: 1,
            quantity: 6,
            price: 8.99,
            color_id: 5,
            size_id: 3,
            color: 'Athletic Heather Gray',
            size: 'Large',
        },
    ],
    salesOrdersPurchaseOrders: [
        {
            purchase_order_id: 1,
            sales_order_id: 1,
        },
        {
            purchase_order_id: 2,
            sales_order_id: 1,
        },
    ],
    soLineItems: [
        {
            sales_order_id: 1,
            item_master_id: 2,
            product_id: 13,
            status_id: 1,
            quantity: 3,
            price: 19.99,
            color: 'Charcoal Gray',
            size: 'Medium',
        },
        {
            sales_order_id: 1,
            item_master_id: 3,
            product_id: 17,
            status_id: 1,
            quantity: 6,
            price: 18.99,
            color: 'Athletic Heather Gray',
            size: 'Large',
        },
    ],
};
exports.default = seed;
//# sourceMappingURL=seedData.js.map