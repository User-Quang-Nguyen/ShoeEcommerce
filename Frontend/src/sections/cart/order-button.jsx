import React from "react";
import { Button } from "antd";

// ------------------------------------------------------------------------

export default function OrderButton({handlerOrder}) {
    return (
        <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handlerOrder}
        >
            Place order
        </Button>
    );
}