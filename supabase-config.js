window.DAURA_SUPABASE_URL='https://xcmyieefdpaaipngphym.supabase.co';
window.DAURA_SUPABASE_KEY='sb_publishable_iraP8sepBprMFD2cildkrQ_TTXOqoXq';
window.DAURA_WHATSAPP='9779744444442';

// Compatibility layer for the existing public.orders table.
// The customer page sends the new field names; older deployments also have
// phone/total columns. Include both so the same frontend works during migration.
(function(){
  const originalFetch=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      const url=typeof input==='string'?input:(input&&input.url)||'';
      if(init && init.method && init.method.toUpperCase()==='POST' && url.includes('/rest/v1/orders') && init.body){
        const data=JSON.parse(init.body);
        if(data.customer_phone && data.phone===undefined) data.phone=data.customer_phone;
        if(data.total_amount!==undefined && data.total===undefined) data.total=data.total_amount;
        init={...init,body:JSON.stringify(data)};
      }
    }catch(e){
      console.warn('Order payload compatibility layer:',e);
    }
    return originalFetch(input,init);
  };
})();
