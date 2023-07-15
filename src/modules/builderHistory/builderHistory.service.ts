import knexConnection from "../../../knexConnection";

class BuilderHistoryService {
  constructor() {
  }

  public postBuilderHistory = async (payload: any, userId: any) => {
    const history = await knexConnection[process.env.NODE_ENV || 'local']("builder_history")
    .insert({
      history: payload?.message || '',
      user_id: userId
    })
    return history;
  };
}

export default new BuilderHistoryService();
