import React, { useEffect, useRef } from "react"

export default function useUpdateEffect(callback: React.EffectCallback, dependencies: React.DependencyList) {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return callback()
        }
        return
    }, [callback, dependencies])
}