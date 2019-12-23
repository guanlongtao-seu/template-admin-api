module.exports = (opts = {}) => {
  return async (ctx, next) => {
    const {key = 'sessionId', store} = opts;
     // TODO
    let id = ctx.cookies.get(key, opts);
    if (!id) {
      ctx.session = {};
      id = store.getID(24);
    } else {
      ctx.session = await store.get(id, ctx);
      if (typeof ctx.session !== 'object' || ctx.session === null) {
        ctx.session = {};
      }
    }
    ctx.sessionId = id;
    const old = JSON.stringify(ctx.session);
    await next();

    // if not changed
    if (old === JSON.stringify(ctx.session)) return;

    // if is an empty object
    if (ctx.session instanceof Object && !Object.keys(ctx.session).length) {
      ctx.session = null;
    }

    // need clear old session
    if (id && !ctx.session) {
      await store.destroy(id, ctx);
      return;
    }

    // set/update session
    const sid = await store.set(ctx.session, Object.assign({}, opts, { sid: id }), ctx);
    ctx.cookies.set(key, sid, opts);
  }
};
