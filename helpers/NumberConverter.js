export const p2e = s => {
    if(!s) return
    return `${s}`.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) 
}